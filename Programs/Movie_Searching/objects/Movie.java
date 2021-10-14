package movie_search;

import java.util.ArrayList;

public class Movie {
	private String name;
	private ArrayList<Actor> actors;
	double rating;
	public Movie(String name) {
		actors = new ArrayList<Actor>();
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Actor> getActors() {
		return actors;
	}
	public void addActors(Actor actor) {
		this.actors.add(actor);
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	
}
