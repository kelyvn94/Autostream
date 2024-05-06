"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  status: z.string(),
});

export const UpdateCarStatus = ({ id }) => {
  const [isMounted, setisMounted] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const { refresh } = useRouter();

  async function onSubmit(values) {
    console.log(values);
    try {
      setisSubmitting(true);
      await axios.put("/api/checkout", {
        id: id,
        status: values.status,
      });

      toast.success("status updated successful");
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booking Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Update Booking Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LIVE">LIVE</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="CANCELLED">CANCEL</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader className="animate-spin" />
              <div>updating...</div>
            </div>
          ) : (
            <div>update status</div>
          )}
        </Button>
      </form>
    </Form>
  );
};
