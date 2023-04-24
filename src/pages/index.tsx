import React, {useEffect, useState} from "react";
import Movie from "@/components/Movie/Movie";
import Modal from "@/components/Modal/Modal";
import { useDispatch, useSelector } from 'react-redux'
import {closeModal, openModal} from "../../store/modal";
import {RootState} from "../../store";
import {getMovies, setSort, setOrder, setSearchBy,  importMovies} from "../../store/movie";
import {CircleLoader} from "react-spinners";
import Button from "@/components/Button/Button";
import ListBox from "@/components/ListBox/ListBox";
import {optionsOrder, optionsSearchBy, optionsSort} from "@/mock";
import {UploadButton} from "@/components/Button/UploadButton";
import {MovieForm} from "@/components/MovieForm/MovieForm";
import {AuthForm} from "@/components/AuthForm/Auth";
interface IOption {
    label: string;
    value: string;
}


export default function Home() {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const { movies, isLoading, error, sort, order, searchBy, limit, offset, fileContent } = useSelector((state: RootState) => state.movies);
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal)

  const [currentOptionSort, setCurrentOptionSort] = useState(optionsSort.filter(option => option.value === sort)[0]);
  const [currentOptionOrder, setCurrentOptionOrder] = useState(optionsOrder.filter(option => option.value === order)[0]);
  const [currentOptionSearchBy, setCurrentOptionSearchBy] = useState(optionsSearchBy.filter(option => option.value === searchBy)[0]);

  const handleSelectSort = (option: IOption) => {
    setCurrentOptionSort(option);
    dispatch(setSort(option.value));
  };

  const handleSelectOrder = (option: IOption) => {
    setCurrentOptionOrder(option);
    dispatch(setOrder(option.value));
  };

  const handleSelectSearchBy = (option: IOption) => {
    setCurrentOptionSearchBy(option);
    dispatch(setSearchBy(option.value));
  };
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, sort, order, searchBy, limit, offset]);

  if (isLoading) {
    return <CircleLoader className={"mx-auto"} color="#36d7b7" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const modalData = () => {
    switch (modalType) {
    case 'create':
      return <MovieForm />
    case 'login':
      return <AuthForm type="login" />
    case 'register':
      return <AuthForm type="register" />
    default:
      return null;
    }
  }
  const modalTitle = () => {
    switch (modalType) {
    case 'create':
      return 'Create Movie'
    case 'login':
      return 'Login'
    case 'register':
      return 'Register'
    default:
      return null;
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold dark:text-white text-blue-400 text-center">Movie App</h1>
      <h3 className={'text-2xl font-bold dark:text-white text-blue-300 my-2'} > For load movies you need login using default credential of create new account </h3>
      <div className={'flex gap-2'}>
        <Button color="blue" title="Login" onClick={() => dispatch(openModal('login'))} />
        <Button color="blue" title="Register" onClick={() => dispatch(openModal('register'))} />
      </div>
      <h3 className={'text-2xl font-bold dark:text-white text-blue-300 my-2'} > Here you can create new movie and upload txt file with movies </h3>
      <div className={'flex gap-2'}>

        <Button color="blue" title="Create" onClick={() => dispatch(openModal('create'))} />
        <UploadButton onFileSelect={(content) => {
          console.log('content', typeof content);
          dispatch(importMovies(content)).then(() => {
            dispatch(getMovies());
          });
        }} />
      </div>
      {fileContent && <p>{fileContent}</p>}
      <h3 className={'text-2xl font-bold dark:text-white text-blue-300 my-2'} > Here you can customise parameters for getting movies</h3>
      <ListBox
        options={optionsSort}
        currentOption={currentOptionSort}
        handleSelectOption={handleSelectSort}
        label={'Sort by'}
      />
      <ListBox
        options={optionsOrder}
        currentOption={currentOptionOrder}
        handleSelectOption={handleSelectOrder}
        label={'Order by'}
      />
      <ListBox
        options={optionsSearchBy}
        currentOption={currentOptionSearchBy}
        handleSelectOption={handleSelectSearchBy}
        label={'Search by'}
      />
      <Modal
        isOpen={isOpen}
        closeModal={() => dispatch(closeModal())}
        title={modalTitle() as string}
      >
        {modalData()}
      </Modal>

      <div className="grid gap-8 grid-cols-1 ">
        {movies ? movies.map(({ title, id, year, format }) => (
          <Movie
            title={title}
            year={year}
            format={format}
            id={id}
            key={id}
          />
        )) : null}
      </div>
    </div>
  )
}
