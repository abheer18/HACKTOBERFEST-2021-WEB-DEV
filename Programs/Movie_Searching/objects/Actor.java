package movie_search;

import java.util.ArrayList;

public class Actor {
	private String name;
	private ArrayList<Movie> movies;
	public Actor() {
		this.movies = new ArrayList<Movie>();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Movie> getMovies() {
		return movies;
	}
	public void addMovie(Movie movie) {
		this.movies.add(movie);
	}
}
