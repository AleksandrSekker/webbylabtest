import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from "@/constants/general";

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
}

interface movieCreate {
  title: string;
  year: number;
  format: string;
  actors: string[];
}
const initialState: MoviesState = {
  movies: [],
  authToken: typeof window !== 'undefined' ? window.localStorage.getItem('authToken') as string : null,
  isLoading: false,
  error: null,
  sort: 'title',
  order: 'ASC',
  searchBy: 'title',
  limit: 10,
  offset: 0,
  fileContent: '',
};

export const getMovies: any = createAsyncThunk(
  'movies/getMovies',
  async (_, { getState }: any) => {
    const currentState: MoviesState = getState().movies
    const response = await fetch(`${baseURL}movies?sort=${currentState.sort}&order=${currentState.order}&limit=${currentState.limit}&offset=${currentState.offset}`, {
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('authToken') as string
      }
    });
    return await response.json();
  }
);
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
    const responseData = await response.json();

    console.log('response', responseData);

    return responseData;
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
    const responseData = await response.json();

    console.log('response', responseData);

    return responseData;
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.data;
      state.error = null;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(importMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(importMovies.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(importMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createMovie.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createMovie.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      window.localStorage.setItem('authToken', action.payload.token);

    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      window.localStorage.setItem('authToken', action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSort, setOrder, setSearchBy } = moviesSlice.actions


export default moviesSlice.reducer;

