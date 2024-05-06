"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Loader } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name must be atleast 2 characters",
  }),
});

export const UpdateBrand = ({id}) => {
  const [isMounted, setisMounted] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitting(true);
      const resp = await axios.put(`/api/brands?id=${id}`, {
        name: values.name,
      });

      refresh();
      toast.success(`${resp?.data?.name} updated`);
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
    <Dialog>
      <DialogTrigger>
        <Button variant='outline' size="sm">
          <Edit className="text-sky-600"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Car Brand</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Toyota"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="animate-spin" />
                    <div>updating...</div>
                  </div>
                ) : (
                  <div>update brand</div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
