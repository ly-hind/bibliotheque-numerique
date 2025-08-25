import cv2
import os
import time
import requests  # Import pour faire la requête HTTP

# Dossier contenant les images des objets (code-barres ou autres objets)
CODEBARRE_FOLDER = '../employe/uploads/codebarre/'

# Fonction pour charger et extraire des points clés des images dans le dossier
def load_known_images():
    known_images = []
    known_names = []
    orb = cv2.ORB_create()  # Utilisation de l'algorithme ORB pour extraire les points clés

    for filename in os.listdir(CODEBARRE_FOLDER):
        filepath = os.path.join(CODEBARRE_FOLDER, filename)
        if filepath.endswith(('.jpg', '.jpeg', '.png')):  # Filtrer les types d'images valides
            # Charger l'image en niveaux de gris
            image = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
            # Détecter les points clés et descripteurs
            keypoints, descriptors = orb.detectAndCompute(image, None)
            if descriptors is not None:
                known_images.append((keypoints, descriptors))
                known_names.append(os.path.splitext(filename)[0])  # Sauvegarder le nom sans l'extension
    return known_images, known_names

# Fonction pour comparer l'image capturée avec les images connues
def capture_and_compare_images(known_images, known_names):
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Réduire la résolution pour de meilleures performances
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_FPS, 30)  # Essayer d'augmenter les FPS pour une meilleure fluidité

    if not cap.isOpened():
        print("Impossible d'ouvrir la caméra")
        return

    orb = cv2.ORB_create()
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)  # Désactiver crossCheck pour utiliser le ratio test
    last_detection_time = 0  # Dernière détection
    detection_interval = 2  # Temps en secondes entre les détections

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Impossible de recevoir le flux vidéo (erreur de lecture)")
            break

        # Ne procéder à la détection que toutes les 2 secondes
        current_time = time.time()
        if current_time - last_detection_time < detection_interval:
            continue

        # Convertir l'image en niveaux de gris pour la comparaison
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Détecter les points clés et descripteurs dans l'image capturée
        keypoints, descriptors = orb.detectAndCompute(gray_frame, None)

        if descriptors is not None:
            for i, (known_keypoints, known_descriptors) in enumerate(known_images):
                # Trouver les correspondances
                matches = bf.knnMatch(descriptors, known_descriptors, k=2)  # Trouver les deux meilleures correspondances

                # Appliquer le ratio test
                good_matches = [m for m, n in matches if m.distance < 0.75 * n.distance]

                # Si suffisamment de bonnes correspondances sont trouvées
                if len(good_matches) > 20:  # Ajuste ce seuil selon les résultats
                    found_name = known_names[i]
                    print(f"Objet correspondant trouvé : {found_name}")
                    # Afficher le cadre et le nom de l'objet trouvé
                    cv2.putText(frame, found_name, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

                    # Envoi du nom du code-barres trouvé au backend via une requête HTTP POST
                    try:
                        response = requests.post('https://employe-oub4.onrender.com/api/barcode-found', json={'name': found_name})
                        print(f"Réponse du serveur : {response.status_code}")
                    except Exception as e:
                        print(f"Erreur lors de l'envoi des données : {e}")
                    
                    break

        # Afficher l'image capturée avec le nom de l'objet détecté
        cv2.imshow('Reconnaissance d\'objet', frame)
        last_detection_time = current_time  # Mettre à jour le temps de la dernière détection

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    print("Chargement des images connues...")
    known_images, known_names = load_known_images()

    print("Démarrage de la détection d'objets...")
    capture_and_compare_images(known_images, known_names)
