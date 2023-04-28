import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseURL} from "@/constants/general";
import {IMovieItem} from "@/pages/[id]";

// Define your state and initial state here
interface MoviesState {
  movies: [];
  isLoading: boolean;
  error: string | null;
  sort: 'title' | 'year' | 'id';
  order: 'ASC' | 'DESC';
  searchBy: 'actor' | 'title' | 'search';
  limit: number;
  offset: number;
  fileContent: string;
  authToken: string | null;
  searchValue: string;
  currentPage: number;
  totalPages: number | null;
  imported: number | null;
  movie: IMovieItem;
}

interface movieCreate {
  title: string;
  year: number;
  format: string;
  actors: string[];
}

const initialState: MoviesState = {
  movies: [],
  movie: {
    id: 0,
    title: '',
    year: 2000,
    format: 'DVD',
    actors: []
  },
  authToken: typeof window !== 'undefined' ? window.localStorage.getItem('authToken') as string : null,
  isLoading: false,
  error: null,
  sort: 'title',
  order: 'ASC',
  searchBy: 'title',
  limit: 10,
  offset: 0,
  fileContent: '',
  searchValue: '',
  currentPage: 1,
  totalPages: null,
  imported: null,
};
const fullURL = (currentState: MoviesState) => {
  const url = new URL(`${baseURL}movies`);
  url.searchParams.set('sort', currentState.sort);
  url.searchParams.set('order', currentState.order);
  url.searchParams.set('limit', String(currentState.limit));
  url.searchParams.set('offset', String(currentState.offset));
  if (currentState.searchValue.length > 1) {
    url.searchParams.set(currentState.searchBy, currentState.searchValue);
  }
  return url;
}
export const getMovies: any = createAsyncThunk(
  'movies/getMovies',
  async (_, { getState }: any) => {
    const currentState: MoviesState = getState().movies
    const response = await fetch(fullURL(currentState), {
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('authToken') as string
      }
    });
    console.log(fullURL(currentState))
    return await response.json();
  }
);

export const getOneMovie: any = createAsyncThunk(
  'movies/getOneMovie',
  async (id: number) => {
    const response = await fetch(`${baseURL}movies/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('authToken') as string
      }
    });
    return await response.json();
  });

export const deleteMovie: any = createAsyncThunk(
  'movies/deleteMovie',
  async (id: number) => {
    const response = await fetch(`${baseURL}movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': window.localStorage.getItem('authToken') as string
      }
    });
    return await response.json();
  }
);
export const importMovies: any = createAsyncThunk(
  'movies/importMovies',
  async (fileContent: string) => {
    const formData = new FormData();
    formData.append('movies', new Blob([fileContent], { type: 'text/plain' }), 'file.txt');

    const response = await fetch(`${baseURL}movies/import`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Authorization': window.localStorage.getItem('authToken') as string
      },
      body: formData
    });
    return await response.json();
  }
);

export const login: any = createAsyncThunk(
  'movies/login',
  async (data) => {
    const response = await fetch(`${baseURL}sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  });
export const register: any = createAsyncThunk(
  'movies/register',
  async (data) => {
    const response = await fetch(`${baseURL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  });
export const createMovie: any = createAsyncThunk(
  'movies/createMovie',
  async (movie: movieCreate) => {
    const response = await fetch(`${baseURL}movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('authToken') as string
      },
      body: JSON.stringify({ title: movie.title, year: movie.year, format: movie.format, actors: movie.actors  })
    });
    return await response.json();
  })
// Define your slice here
export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setFileContent: (state, action) => {
      state.fileContent = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.offset = action.payload <= 1 ? 0 : (action.payload - 1) * state.limit;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
    removeImportedValue: (state) => {
      state.imported = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.data;
      state.totalPages = action.payload.meta?.total ? Math.ceil(action.payload.meta.total / state.limit) : null;
      if (action.payload.error){
        state.error = action.payload.error.code
      }
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
    builder.addCase(getOneMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneMovie.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movie = action.payload.data;
      if (action.payload.error){
        state.error = action.payload.error.code
      }
    });
    builder.addCase(getOneMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
    builder.addCase(importMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(importMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.imported = action.payload.meta?.imported;
      if (action.payload.error){
        state.error = action.payload.error.code
      }
    });
    builder.addCase(importMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
    builder.addCase(createMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMovie.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.error) {
        state.error = action.payload.error.code;
      }
    });
    builder.addCase(createMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      window.localStorage.setItem('authToken', action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      window.localStorage.setItem('authToken', action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error.code;
    });
  },
});

export const { setSort, setOrder, setSearchBy, setCurrentPage, removeError, setError, setLimit, setSearchValue } = moviesSlice.actions


export default moviesSlice.reducer;

