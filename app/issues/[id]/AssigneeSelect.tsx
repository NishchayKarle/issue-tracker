"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) {
        return <Skeleton height="2rem" />;
    }

    if (error) {
        return null;
    }

    const assignIssue = (userId: string) => {
        axios
            .patch(`/api/issues/${issue.id}`, {
                assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .catch(() => {
                toast.error("Failed to update assignee.");
            });
    };

    return (
        <>
            <Select.Root
                onValueChange={assignIssue}
                defaultValue={issue.assignedToUserId || "unassigned"}
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

const useUsers = () =>
    useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axios.get<User[]>("/api/users");
            return data;
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 3, // retry 3 times
    });

export default AssigneeSelect;
