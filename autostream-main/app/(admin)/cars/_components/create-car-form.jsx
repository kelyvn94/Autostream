"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { Card, CardContent } from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Loader, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  regno: z.string(),
  price: z.string(),
  kmsdriven: z.string(),
  capacity: z.string(),
  transmission: z.string(),
  fuel: z.string(),
  brand: z.string(),
  bodytype: z.string(),

  fastag: z.boolean().optional().default(false),
  sunroof: z.boolean().optional().default(false),
  cruisecontrol: z.boolean().optional().default(false),
  camera: z.boolean().optional().default(false),
  delivery: z.boolean().optional().default(false),
  airbags: z.boolean().optional().default(false),
});

export const CreateCarForm = () => {
  const { data: brands, Error } = useFetch("/api/brands");
  const [thumbnailImg, setthumbnailImg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      setisSubmitting(true);
      if (thumbnailImg == "") {
        toast.error("upload thumbnail for this car");
      }

      await axios.post("/api/cars", {
        name: values.name,
        regno: values.regno,
        price: values.price,
        kmsdriven: values.kmsdriven,
        capacity: values.capacity,
        transmission: values.transmission,
        fuel: values.fuel,
        brand: values.brand,
        bodytype: values.bodytype,
        fastag: values.fastag,
        sunroof: values.sunroof,
        cruisecontrol: values.cruisecontrol,
        camera: values.camera,
        delivery: values.delivery,
        airbags: values.airbags,
        thumbnailImg,
      });

      toast.success("uploaded sucessful");
      push("/cars");
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <Card className="border-none shadow-none p-2">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="regno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Registration Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Hour</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="kmsdriven"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kilometer Driven</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seats capacity(driver inclusive)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="bodytype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Body type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified body type to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>

                          <SelectItem value="compactsuv">
                            compact SUV
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Car Brand</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car brand to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands?.map((brand, i) => (
                            <SelectItem key={i} value={brand?.id}>
                              {brand?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Transmission</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Transmission to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Fuel Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Fuel type to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="petrol">Petrol</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <div>Car thumbnail</div>

              {thumbnailImg ? (
                <div className="relative max-w-[300px] h-[40vh]">
                  <Image
                    src={thumbnailImg}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div
                    onClick={() => setthumbnailImg("")}
                    className="absolute top-0 right-0 h-[30px] w-[30px] cursor-pointer bg-rose-500 flex items-center justify-center text-white rounded-full"
                  >
                    <X />
                  </div>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="thumbnail"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res[0].url);
                    toast.success("upload completed");
                    setthumbnailImg(res[0].url);
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="fastag"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Fastag</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sunroof"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Sun roof</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cruisecontrol"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Cruise control</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="camera"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>360 camera</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Home delivery</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="airbags"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Air Bags</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader className="animate-spin" />
                  <div>uploading...</div>
                </div>
              ) : (
                <div>upload car</div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
