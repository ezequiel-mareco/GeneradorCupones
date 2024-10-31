"use client";
import {useState} from "react";

import {Button} from "@/components/ui/button";

interface Coupon {
  email: string;
  discount: string;
  code: string;
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const GenerateCoupon = () => {
    if (email && discount) {
      const discountPercentage = parseInt(discount);

      if (
        discountPercentage > 0 &&
        discountPercentage <= 100 &&
        email.includes("@") &&
        email.includes(".com")
      ) {
        const code = Math.random().toString(36).substring(5).toUpperCase();
        const newCoupon = {
          email: email,
          discount: discount,
          code: code,
        };

        setCoupons([...coupons, newCoupon]);
        setEmail("");
        setDiscount("");
      } else {
        alert("Por favor ingrese datos validos");
      }
    } else {
      alert("Complete los campos solicitados antes de generar un cupón");
    }
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col justify-center space-y-12">
      <section className="flex flex-col space-y-6 rounded-md bg-blue-950 p-12 text-white">
        <h1 className="my-4 text-4xl tracking-wide">Generador de cupones:</h1>
        <div>
          <p className="text-xl">Por favor ingrese un email:</p>
          <input
            className="w-full rounded-md px-2 py-1 text-slate-700"
            placeholder="ExampleMail@gmail.com"
            type="text"
            onChange={(x) => setEmail(x.target.value)}
          />
        </div>
        <div>
          <p className="text-xl">Seleccione el porcentaje de descuento a aplicar al cupón:</p>
          <input
            className="w-full rounded-md px-2 py-1 text-slate-700"
            placeholder="0"
            type="number"
            onChange={(x) => setDiscount(x.target.value)}
          />
        </div>
        <Button className="text-xl font-bold hover:bg-slate-400" onClick={GenerateCoupon}>
          Generar cupón de descuento
        </Button>
      </section>
      <section className="flex flex-col space-y-6 rounded-md bg-blue-950 p-12 text-white">
        <div>
          <h2 className="my-4 text-4xl tracking-wide">Historial de cupones:</h2>
          <div>
            {coupons.map((coupon, key) => (
              <div key={key} className="my-4 bg-blue-800 rounded-md p-2">
                <p>Enviado a: {coupon.email}</p>
                <p>Descuento del: {coupon.discount}%</p>
                <p>Código: {coupon.code}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
