import React, {useEffect} from 'react';
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import {closeModal, openModal} from "../../store/modal";
import {AuthForm} from "@/components/AuthForm/Auth";
import Modal from "@/components/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useRouter} from "next/router";
import {removeError} from "../../store/movie";

const Auth = () => {
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch();
  const router = useRouter();
  const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (authToken) {
      router.push("/").then(() => {
        dispatch(removeError())
      });
    }
  }, [router, router.pathname, authToken, dispatch]);

  return (
    <div className="text-center">
      <Text title="For load movies you need login using default credential of create new account" />
      <div className={'flex gap-2 justify-center'}>
        <Button color="blue" title="Login" onClick={() => dispatch(openModal('login'))} />
        <Button color="blue" title="Register" onClick={() => dispatch(openModal('register'))} />
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => dispatch(closeModal())}
        title={modalType === 'login' ? 'Login' : 'Register'}
      >
        {modalType === 'login' ? <AuthForm type="login" /> : <AuthForm type="register" />}
      </Modal>
    </div>
  );
};

export default Auth;
