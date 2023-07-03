import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { File } from "buffer";
import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

function getClient() {
  if (accessKeyId && secretAccessKey) {
    return new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
  } else {
    throw new Error("AWS credentials missing");
  }
}

export async function store(file: File) {
  const client = getClient();

  try {
    const data: CompleteMultipartUploadCommandOutput = await new Upload({
      client,
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
}

export async function destroy(key: string) {
  const client = getClient();
  key = key.split("/").at(-1) as string;
  const command = new DeleteObjectCommand({
    Bucket,
    Key: key,
  });

  try {
    const data = await client.send(command);
    return { data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
