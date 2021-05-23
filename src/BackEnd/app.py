import os 
import shutil
import json

def write_to_logs(log_msg):
    """
    Writes to logs to double check errors and mistakes   
    """
    with open("log.txt", w) as log_file:
        log_file.append(log_msg)


def delete(path):
    """Deletes every file in a folder
    path: folder path
    """
    for f in os.listdir(path):
        os.remove(os.path.join(path, f))

def getPath():
    """
    Gets path of the from ./metadata.json/  
    """
    with open('metadata.json', 'r') as openfile:
        global path
        json_object = json.load(openfile)
        pairs = json_object.items()
        path = json_object["renamer"]["path"]
    return path

def getStartNumber():
    """
    returns the number of start renaming from ./metadata.json
    """
    with open('metadata.json', 'r') as openfile:
        json_object = json.load(openfile)
        pairs = json_object.items()
        srt = json_object["renamer"]["srt"]
    return srt

def getSrcDst():
    """
    gets Sorce and Destination path from ./metadata.json/
    """
    with open('metadata.json', 'r') as openfile:
        global path
        json_object = json.load(openfile)
        pairs = json_object.items()
        src = json_object["backup"]["src"]
        dst = json_object["backup"]["dst"]
        srt = json_object["renamer"]["srt"]
        return src, dst

def backup(symlinks=False, ignore=None):
    """
    Backs up Renaming folder to a new folder in Desktop to prevent loss from errors
    """
    (src, dst) = getSrcDst()
    delete(dst)
    try:
        for item in os.listdir(src):
            s = os.path.join(src, item)
            d = os.path.join(dst, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, symlinks, ignore)
            else:
                shutil.copy2(s, d)
                # print(f"Back up'd {src} in {dst}!")
    except:
        print("failed")

def rename():
    """
    renames the renaming folder from according to the starting number 
    """
    srt = getStartNumber()
    path, backup_path = getSrcDst()
    backup()
    files = os.listdir(path) 
    loop_number = 0
    for index, file in enumerate(files):
        
        if not file.endswith('.jpg'):
            if not file.endswith('.JPG'):
                index = index - 1
                continue
                skips += 1
        try:
            number = srt + loop_number
            loop_number +=  1
            os.rename(os.path.join(path, file), os.path.join(path, ''.join([str(number), '.jpg'])))
            write_to_logs(f"{file} → {number}")
            print(f"{file} → {number}")
            sucess += 1
        except Exception as err:
            print(err)

backup()

rename()
