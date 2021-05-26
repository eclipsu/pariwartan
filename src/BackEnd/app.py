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

    files_list = []
    files = os.listdir(dir_path) 
    for index, file in enumerate(files):
        filename, file_extension = os.path.splitext(file)
        files_list.append(filename + file_extension)

    files_list.sort()

    for file in files_list:
        filename, file_extension = os.path.splitext(file)
        os.rename(os.path.join(dir_path, file), os.path.join(dir_path, ''.join([str(starting_number), f"{file_extension}"])))

        starting_number += 1

rename(starting_number, dir_path)

print("Sucess!")
