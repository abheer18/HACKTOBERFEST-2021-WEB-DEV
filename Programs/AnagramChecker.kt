class AnagramChecker(private val word: String) {

    fun match(anagrams: Collection<String>): Set<String> {
        return anagrams
            .filter(isAnagram)
            .toSet()
    }

    private val isAnagram: (String) -> Boolean = {
        if (word.length != it.length || word.equals(it, ignoreCase = true))
            false
        else
            word
                .toLowerCase()
                .toCharArray()
                .sorted() == it
                .toLowerCase()
                .toCharArray()
                .sorted()
    }
}

/**
* How to use:
*
fun main() {
    val checker = AnagramChecker("banana")
    val samples = mutableListOf("nanaba", "apple", "ananab", "banana", "")

    val anagrams = checker.match(samples)
    println(anagrams)
}
*
* 
**/
