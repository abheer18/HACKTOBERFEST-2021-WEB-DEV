package movie_search;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Scanner;

public class MovieDatabase {
	ArrayList<Movie> movieList;
	ArrayList<Actor> actorList;
	public MovieDatabase() {
		movieList = new ArrayList<Movie>();
		actorList = new ArrayList<Actor>();
	}
	public ArrayList<Movie> getMovieList() {
		return movieList;
	}
	
	public ArrayList<Actor> getActorList() {
		return actorList;
	}
	void addMovie(String name, String[] actors) {
		for(Movie movie : movieList) {
			if(movie.getName().equals(name)) {
				return;
			}
		}
		Movie newMovie = new Movie(name);
		movieList.add(newMovie);
		boolean flag = false;
		for(int i = 0; i < actors.length; i++) {
			flag = false;
			for (Actor actor : actorList) {
				if(actor.getName().equals(actors[i])) {
					actor.addMovie(newMovie);
					flag = true;
					newMovie.addActors(actor);
				}
			}
			if (flag == false) {
				Actor a = new Actor();
				a.setName(actors[i]);
				a.addMovie(newMovie);
				actorList.add(a);
				newMovie.addActors(a);
			}
		}		
	}
	void addRating(String name, double rating) {
		for (Movie movie : movieList) {
			if (movie.getName().equals(name)) {
				movie.setRating(rating);
			}
		}
	}
	void updateRating(String name, double newRating) {
		for (Movie movie : movieList) {
			if (movie.getName().equals(name)) {
				movie.setRating(newRating);
			}
		}
	}
	String getBestActor() {
		String best = "";
		double bscore = 0;
		for (Actor actor: actorList) {
			double total = 0;
			int i = 0;
			ArrayList<Movie> l = actor.getMovies();
			for (Movie movie : l) {
				total += movie.getRating();
				i++;
			}
			total = total/i;
			if (total > bscore) {
				bscore = total;
				best = actor.getName();
			}
		}
		return best;
	}
	String getBestMovie() {
		String best = "";
		double bscore = 0;
		for (Movie movie : movieList) {
			if(movie.getRating() > bscore) {
				bscore = movie.getRating();
				best = movie.getName();
			}
		}
		return best;
	}
	public static void main(String[] args) {
		File file = new File("./src/movies.txt");
		ArrayList<String> test = new ArrayList<String>();
		MovieDatabase db = new MovieDatabase();
		try {
			Scanner reader = new Scanner(file);
			reader.useDelimiter(", ");
			while (reader.hasNextLine()) {
				boolean k = true;
				boolean f = true;
				String l = reader.nextLine();
				int x = 0;
				for(int i = 0; i < l.length(); i++) {
					if (l.charAt(i) == (',') && k) {
						//System.out.println(l.substring(0, i));
						k = false;
						x = i;
					}else if ((l.charAt(i) == (',') || l.charAt(i) == ('\n')) && k == false){
						test.add(l.substring(x+2, i));
						x = i;
					}
					if (l.substring(i, l.length()-1).contains(",") == false && f) {
						test.add(l.substring(i + 1, l.length()));
						//System.out.println(l.substring(i + 1, l.length()));
						f = false;
					}
				}
			}
			for (String u : test) {
				Scanner reader2 = new Scanner(file);
				ArrayList<String> test2 = new ArrayList<String>();
				while (reader2.hasNextLine()) {
					String l = reader2.nextLine();
					if (l.contains(u)) {
						test2.add(l.substring(0, l.indexOf(",")));
					}
				}
				db.addMovie(u, test2.toArray(new String[test2.size()]));
			}

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		File file2 = new File("./src/ratings.txt");
		try {
			Scanner reader2 = new Scanner(file2);
			while (reader2.hasNextLine()) {
				String l = reader2.nextLine();
				int k = 0;
				//System.out.println(l);
				for (int i = 0; i < l.length()-1; i++) {
					boolean f = true;
					try {
						//System.out.println(l.substring(i, i+2));
						k = Integer.parseInt(l.substring(i, i+2));
					}catch (NumberFormatException nfe){
						f = false;
					}
					if(f) {
						if(k == 0 || k == 10) {
							k = 100;
						}
						db.addRating(l.substring(0, i - 1).trim(), k);
					}
				}
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			System.out.println(db.getBestActor());
			System.out.println(db.getBestMovie());
	}
}