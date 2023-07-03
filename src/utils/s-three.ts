import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { File } from "buffer";
import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

export async function upload(file: File) {
  if (accessKeyId && secretAccessKey) {
    try {
      const data: CompleteMultipartUploadCommandOutput = await new Upload({
        client: new S3Client({
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          region,
        }),
        params: {
          ACL: "public-read",
          Bucket,
          Key: `${Date.now()}-${file.name}`,
          Body: file as unknown as Buffer,
        },
      }).done();
      return { data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  } else {
    throw new Error("AWS credentials missing");
  }
}
