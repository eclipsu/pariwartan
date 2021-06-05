import os 
import json

metadata_file = open('metadata.json', 'r')
metadata = json.load(metadata_file)

starting_number = metadata["starting_number"]
dir_path = metadata["dir_path"]

metadata_file.close()

if type(starting_number) != int or starting_number < 0:
    print("Invalid number!") 
    quit()

if dir_path == "":
    print("Invalid path!")
    quit()

def rename(starting_number, dir_path):
    """
    renames the renaming folder from according to the starting number 
    """
    numeric_files = [] # Older files, Files which we want to ignore.
    strings_files = [] # Newer files, Files which we want to rename.

    for file in os.listdir(dir_path):
        try:
            int_file = int(os.path.splitext(file)[0])
            numeric_files.append(file)
        except:
            strings_files.append(file)

    for files in numeric_files:
        starting_number += 1

    for files in strings_files:
        starting_number += 1
        filename, file_extension = os.path.splitext(files)
        os.rename(os.path.join(dir_path, files), os.path.join(dir_path, ''.join([str(starting_number), f"{file_extension}"])))
        print(f"{files} -->  {os.path.join(''.join([str(starting_number), f'{file_extension}']))}")

rename(starting_number, dir_path)

print("Sucess!")
