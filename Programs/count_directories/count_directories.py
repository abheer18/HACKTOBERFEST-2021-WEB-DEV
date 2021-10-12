# Simple Python Program to list the number of files and directories present at a given path



import os, os.path

# Stores the number of files present 
files_number = len([name for name in os.listdir('.') if os.path.isfile(name)])

# Stores the number of folders present 
folders_number = len([name for name in os.listdir('.') if os.path.isdir(name)])

# Storess the total number of content ( files + folders ) 
total_content = len( os.listdir(os.getcwd()) )


#print statements

print ( "***************************************")
print ( "Total Files      = "+ str(files_number ))
print ( "Total Folders    = "+ str(folders_number))
print ( "Total Content    = "+ str(total_content))
print ( "***************************************")
