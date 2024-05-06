"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Upload } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const UploadImages = ({ id }) => {
  const [isMounted, setisMounted] = useState(false);
  const [Images, setImages] = useState([]);
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleSubmit = async () => {
    for (let img of Images) {
      const url = img?.url;
      try {
        setisSubmitting(true);

        await axios.post("/api/images", {
          url,
          id,
        });

        toast.success("images saved");
      } catch (error) {
        console.log(error);
      } finally {
        setisSubmitting(false);
      }
    }
  };

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Upload className="text-sky-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload Extra Images (max: 10) -uploaded {Images?.length}/10
          </DialogTitle>
        </DialogHeader>
        {Images.length > 0 ? (
          <ScrollArea className="w-full bg-blue-300 h-[50vh] ">
            {Images?.map((item, i) => (
              <div key={i} className="relative h-[50vh] w-full ">
                <Image
                  src={item?.url}
                  alt={i + 1}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </ScrollArea>
        ) : (
          <UploadDropzone
            endpoint="carImages"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setImages(res);
              toast.success("upload completed");
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}

        <DialogFooter>
          <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <div>
                <div className="flex items-center space-x-2">
                  <Loader className="animate-spin" />
                  <div>Saving...</div>
                </div>
              </div>
            ) : (
              "Save Images"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
