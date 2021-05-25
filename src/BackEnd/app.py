import os 
import shutil
import json
import sys

def getMetadata():
    """
    Gets details about the dir.
    """
    with open('metadata.json', 'r') as metadata_file:
        metadata = json.load(metadata_file)
        starting_number = metadata["details"]["starting_number"]
        backup_path = metadata["details"]["dir_path"]
        dir_path = metadata["details"]["backup_path"]
    return starting_number, backup_path, dir_path

def backup(symlinks=False, ignore=None):
    """
    Backs up Renaming folder to a new folder in Desktop to prevent loss from errors
    """
    (starting_number, backup_path, dir_path) = getMetadata()

    if dir_path == '':
        print("Invalid path")
        exit()
    if backup_path == '':
        print("No backup specified")
        exit()

    try:
        for item in os.listdir(dir_path):
            s = os.path.join(dir_path, item)
            d = os.path.join(backup_path, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, symlinks, ignore)
            else:
                shutil.copy2(s, d)
    except:
        pass
    
def rename():
    """
    renames the renaming folder from according to the starting number 
    """
    (starting_number, backup_path, dir_path) = getMetadata()


    if dir_path == '':
        print("Invalid path")
        exit()
    if backup_path == '':
        print("No backup specified")
        exit()



    files = os.listdir(dir_path) 
    loop_number = 0
    for index, file in enumerate(files):
        print("lol")
        filename, file_extension = os.path.splitext(os.path.join(dir_path, file))
        try:
            number = starting_number + loop_number
            loop_number +=  1
            filename, file_extension = os.path.splitext(file)
            os.rename(os.path.join(dir_path, file), os.path.join(dir_path, ''.join([str(number), file_extension])))
            print(f"{file} → {number}")
        except Exception as err:
            print("Failed to rename")

backup()
rename()

print("Sucess!")
