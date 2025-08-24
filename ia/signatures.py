import cv2, numpy as np, face_recognition, os

# ImgeDB path
path = './images'

# Global variables
image_list = [] # List of images
name_List = [] # List of image names
# Gral all images from the folder
myList = os.listdir(path)
# print(myList)

# Load images
for img in myList:
    if os.path.splitext(img)[1].lower() in ['.jpg', '.png', '.jpeg']:
        curImg = cv2.imread(os.path.join(path, img))
        image_list.append(curImg)
        imgName = os.path.splitext(img)[0]
        name_List.append(imgName)

# Define a function to detect face and extract features therefrom
def findEncodings(img_list, ImgName_list):
    """_summary_
    Define a function to detect face and extract features therefrom

    Args:
        img_list (list): List of BGR of images
        ImgName_list (list): List of image names
    """
    signatures_db = []
    count = 1
    #print(ImgName_list)
    for myImg, name in zip(img_list, ImgName_list):
        img = cv2.cvtColor(myImg, cv2.COLOR_BGR2RGB)
        signature = face_recognition.face_encodings(img)[0]
        signature_class = signature.tolist() + [name]
        signatures_db.append(signature_class)
        print(f'{int((count/ (len(img_list)))*100)} % extracted')
        count +=1
    signatures_db =  np.array(signatures_db)
    np.save('FaceSignatures_db.npy', signatures_db)
    print('Signature_db stored')
    
def main():
    findEncodings(image_list, name_List)

if __name__ =='__main__':
    main()
    
#Ce code crée une base de données des encodages faciaux à partir d'un dossier d'images. Il pourrait être utilisé dans des applications de reconnaissance faciale, où vous avez besoin de comparer 
#des visages avec des signatures faciales pré-existantes.