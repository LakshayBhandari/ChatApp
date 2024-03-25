"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type Variant = "Login" | "Register";
const Authform = () => {
  const [variant, setVariant] = useState<Variant>("Login");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "Login") {
      setVariant("Register");
    } else {
      setVariant("Login");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "Register") {
      //AXIOS REGISTER
      axios.post('/api/register',data)
      .catch(()=> toast.error('Something went wrong!'))
      .finally(()=>setIsLoading(false))
    }
    if (variant === "Login") {
      //NextAuth SignIn
      signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        if(callback?.error){
          toast.error('InValid Credentials');
        }

        if(callback?.ok && !callback?.error){
          toast.success('Logged In!')
        }
      })
      .finally(()=> setIsLoading(false))
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    //Next Auth Social SignIn
    signIn(action,{redirect:false})
    .then((callback)=>{
      if(callback?.error){
        toast.error('Invalid Credentials');
      }
      if(callback?.ok && !callback?.error)
      {
        toast.success('Logged In!')
      }
    })
  };
  return (
    <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "Register" && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input
            id="email"
            label="Email address"
            type="emai"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "Login" ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className=" mt-6">
          <div className="relative">
            <div className=" absolute inset-0 flex items-center">
              <div className=" w-full border-t border-gray-300" />
            </div>
            <div className=" relative flex justify-center text-sm">
              <span className=" bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className=" mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "Login"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className=" underline cursor-pointer">
            {variant === "Login" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authform;
