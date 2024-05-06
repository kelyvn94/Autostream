"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarX2Icon, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useId, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const FormSchema = z.object({
  start: z.date({
    required_error: "A date start is required.",
  }),
  end: z.date({
    required_error: "A date end is required.",
  }),
});

export function BookingForm({ price, id }) {
  const [totalhours, settotalhours] = useState(0);
  const [isSubmitting, setisSubmitting] = useState(false);

  const { userId } = useAuth();
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const yesterDay = () => {
    var currentDate = new Date();

    var yesterdayTimestamp = currentDate.getTime() - 24 * 60 * 60 * 1000;

    var yesterdayDate = new Date(yesterdayTimestamp);

    return yesterdayDate;
  };

  async function onSubmit(data) {
    var startDate = new Date(data.start);
    var endDate = new Date(data.end);

    var startTimeStamp = startDate.getTime();
    var endTimeStamp = endDate.getTime();

    var timeDiff = endTimeStamp - startTimeStamp;

    var hoursDiff = timeDiff / (1000 * 60 * 60);
    settotalhours(hoursDiff);

    try {
      setisSubmitting(true);

      if (!userId) {
        push("/sign-in");
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));

      const response = await axios.post("/api/reserve", {
        end: data.end,
        start: data.start,
        totalhours: JSON.stringify(hoursDiff),
        totalprice: JSON.stringify(`${parseInt(price) * hoursDiff}`),
        carId: id,
      });

      toast.success("successful");

      push(`/car/${id}/${response?.data?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-3 mx-2">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarX2Icon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < yesterDay()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-3 mx-2">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarX2Icon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="flex items-center justify-between">
          <div>Total Hours</div>
          <div>{totalhours} hrs</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Total Amount</div>
          <div>$ {parseInt(price) * totalhours}</div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader className="animate-spin" />
              <div>sending to checkout...</div>
            </div>
          ) : (
            "continue"
          )}
        </Button>
      </form>
    </Form>
  );
}
