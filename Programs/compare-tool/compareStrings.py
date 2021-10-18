import sys

# total arguments
print("Total arguments passed: " + str(len(sys.argv)))

assert (len(sys.argv) is not 2), "Expected 2 arguments."

s1 = sys.argv[1]
s2 = sys.argv[2]

print("No of characters in both strings: (" + str(len(s1)) + "," + str(len(s2)) + ")")
print("Are they equal? " + str(s1==s2))
counter=0
for char1,char2 in zip(s1,s2):
	counter+=1
	if char1!=char2:
		# Character1,Character2,Position
		print(char1 + "," + char2 + "," + str(counter) + "\n")
