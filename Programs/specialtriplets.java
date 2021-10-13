import java.io.*;

class specialtriplets {
    public static void main(String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine());
        for (int i = 0; i < T; i++) {
            int N = Integer.parseInt(br.readLine());
            int count = 0;
            for (int x = 1; x < N + 1; x++) {
                for (int y = x; y < N + 1; y += x) {
                    if (y % x == 0) {
                        for (int z = x; z < N + 1; z += y) {
                            if (z % y == x) {
                                count += 1;
                            }
                        }
                    }
                }
            }
            System.out.println(count);
        }
    }
}
