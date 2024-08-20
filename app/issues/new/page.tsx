"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <form
            className="max-w-xl space-y-5"
            onSubmit={handleSubmit(async (data) => {
                await fetch("/api/issues", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                router.push("/issues");
            })}
        >
            <TextField.Root placeholder="Title" {...register("title")} />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button> Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
