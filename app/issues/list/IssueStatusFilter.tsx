"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const open: Status = "OPEN";
    const searchParams = useSearchParams();

    return (
        <Select.Root
            defaultValue={searchParams.get("status") || ""}
            onValueChange={(s) => {
                const params = new URLSearchParams();
                if (s !== "ALL") params.append("status", s);
                if (searchParams.get("orderBy"))
                    params.append("orderBy", searchParams.get("orderBy")!);
                searchParams.get("orderBy");

                const query = params.size ? "?" + params.toString() : "";
                router.push(`/issues/list/${query}`);
            }}
        >
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map((s) => (
                    <Select.Item key={s.label} value={s.value || "ALL"}>
                        {" "}
                        {s.label}{" "}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
