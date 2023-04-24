import { render, screen, fireEvent } from "@testing-library/react";
import Movie from "./Movie";

const movie = {
  id: 1,
  title: "Movie Title",
  year: 2022,
  format: "DVD",
  deleteMovie: jest.fn(),
};

describe("Movie", () => {
  const { id, title, year, format, deleteMovie } = movie;
  it("renders movie details and buttons", () => {
    render(<Movie id={id} title={title} year={year} format={format} deleteMovie={deleteMovie}   />);

    expect(screen.getByText("Movie Title")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("DVD")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(movie.deleteMovie).toHaveBeenCalled();
  });
});
