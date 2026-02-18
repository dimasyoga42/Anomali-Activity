import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Image harus diisi" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const API_KEY = process.env.IMGBB_API_KEY;

    const body = new URLSearchParams();
    body.append("image", base64);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body,
      }
    );

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "Upload ke ImgBB gagal" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.data.url,
      display_url: data.data.display_url,
      delete_url: data.data.delete_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
};
