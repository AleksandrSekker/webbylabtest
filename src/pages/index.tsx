import React, {ChangeEvent, useEffect, useState} from "react";
import Movie from "@/components/Movie/Movie";
import Modal from "@/components/Modal/Modal";
import {batch, useDispatch, useSelector} from 'react-redux'
import {closeModal, openModal} from "../../store/modal";
import {RootState} from "../../store";
import {
  deleteMovie,
  getMovies,
  importMovies,
  removeError, setLimit,
  setOrder,
  setSearchBy,
  setSearchValue,
  setSort
} from "../../store/movie";
import {CircleLoader} from "react-spinners";
import Button from "@/components/Button/Button";
import ListBox from "@/components/ListBox/ListBox";
import {optionsOrder, optionsSearchBy, optionsSort} from "@/mock";
import {UploadButton} from "@/components/Button/UploadButton";
import {MovieForm} from "@/components/MovieForm/MovieForm";
import {AuthForm} from "@/components/AuthForm/Auth";
import Pagination from "@/components/Pagination/Pagination";
import Text from "@/components/Text/Text";
import ErrorMessage from "@/components/Message/Message";
import SearchInput from "@/components/Input/SearchInput";
interface IOption {
    label: string;
    value: string;
}

interface Movie {
    createdAt: string
    format: string
    id: number
    title: string
    updatedAt: string
    year: number
}
export default function Home() {
  const dispatch = useDispatch();
  const { movies, isLoading, error, sort, order, searchBy, limit, offset, currentPage, totalPages, imported, searchValue } = useSelector((state: RootState) => state.movies);

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
    if(limit > 0){
      dispatch(getMovies());
    }
  }, [dispatch, sort, order, searchBy, limit, offset, searchValue]);

  if (isLoading) {
    return <CircleLoader className={"mx-auto"} color="#36d7b7" />;
  }

  if (error) {
    return <ErrorMessage show={!!error.length} message={error} removeError={() => dispatch(removeError())} />
  }

  console.log('error', error)
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
  const movieCurrent = (movieId: number) => movies.filter(({id}) => id === movieId)[0] as Movie;

  console.log('searchValue', searchValue)
  return (
    <>
      <h1 className="text-4xl font-bold dark:text-white text-blue-400 text-center mt-4">Movie App</h1>

      <Text title="Here you can create new movie and upload txt file with movies" />
      <div className={'flex gap-2'}>
        <Button color="blue" title="Create" onClick={() => dispatch(openModal('create'))} />
        <UploadButton onFileSelect={(content) => {
          dispatch(importMovies(content)).then(() => {
            console.log('imported', content);
            dispatch(getMovies());
          });
        }} />
      </div>
      <Text title="Here you can customise parameters for getting movies" />
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
      {modalType.split('_')[0] !== 'deleteMovie' ? <Modal
        isOpen={isOpen}
        closeModal={() => dispatch(closeModal())}
        title={modalTitle() as string}
      >
        {modalData()}
      </Modal> : null}

      {imported ? (
        <>
          <p>
            Imported: {imported}
          </p>
        </>
      ): null}
      <SearchInput
        title={`Limit: ${limit}`}
        placeholder={`Change limit`}
        type="number"
        className=""
        name="limitChange"
        value={limit}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setLimit(e.target.value))}
      />
      <SearchInput
        title={`Search by: ${searchBy}`}
        placeholder={`Search by: ${searchBy}`}
        type="text"
        className="mt-2"
        name="search"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchValue(e.target.value))}
      />
      <div className="grid gap-8 grid-cols-1 my-4 ">
        {movies ? movies.map(({ title, id, year, format }: Movie) => (
          <>
            <Movie
              title={title}
              year={year}
              format={format}
              id={id}
              key={id}
            />
            {modalType.split('_')[0] === 'deleteMovie'? <Modal
              isOpen={isOpen}
              closeModal={() => dispatch(closeModal())}
              title={`Delete movie`}>
              <div>
                <p className="text-md font-bold dark:text-white text-red-400 mb-2">Are you sure you want to
                              delete this movie?</p>
                <div className={'flex columns-2 gap-2'}>
                  <Button color="gray" title="Yes" onClick={() =>
                    dispatch(deleteMovie(movieCurrent(Number(modalType.split('_')[1])).id)).then(() => {
                      batch(() => {
                        dispatch(getMovies())
                        dispatch(closeModal())
                      })
                    })
                  }/>
                  <Button color="blue" title="Not" onClick={() => dispatch(closeModal())}/>
                </div>
              </div>
            </Modal> : null}
          </>
        )) : null}
        {totalPages ? <Pagination currentPage={currentPage} totalPages={totalPages}/>: null}
      </div>
    </>
  )
}
