import requests as req
import json


def get_monsters(URL):
    try:
        response = req.get(URL)
        response.raise_for_status()
        data = response.json()
    except req.exceptions.RequestException as e:
        print(f"Error fetching data from {URL}: {e}")
        return []
    monsters = [{"id": mon["id"], "species": mon["species"], "name": mon["name"], "description": mon["description"],
                 "elements": mon["elements"], "assets": {"image": ""}} for mon in data]
    
    with open("monstruos.json", "w", encoding="utf-8") as file:
        json.dump(monsters, file, indent=4, ensure_ascii=False)

def get_arma(URL):
    response = req.get(URL)
    data = response.json()

    armas = [
        {
            "id": arma["id"],
            "type": arma["type"],
            "name": arma["name"],
            "assets": {"image": arma.get("assets", {}).get("image", "No disponible") if arma and arma.get("assets") else "No disponible"},
            "attack": {"display": arma.get("attack", {}).get("display", "Valor por defecto")}
        }
        for arma in data if arma
    ]

    with open("armas.json", "w", encoding="utf-8") as file:
        json.dump(armas, file, indent=4, ensure_ascii=False)

def get_location(URL):
    response = req.get(URL)
    data = response.json()

    lugares =[{"id": lugar["id"], "name": lugar["name"],"assets": {"image": ""}  }for lugar in data]
    
    with open("lugares.json", "w", encoding="utf-8") as file:
        json.dump(lugares, file, indent=4, ensure_ascii=False)


def get_item(URL):
    response = req.get(URL)
    data = response.json()

    items = [{"id": item["id"], "name": item["name"], "description": item["description"]} for item in data]
    with open("items.json", "w", encoding="utf-8") as file:
        json.dump(items, file, indent=4, ensure_ascii=False)

def get_armadura(URL):
    response = req.get(URL)
    data = response.json()

    armaduras = [{"id": armadura["id"],
                "name": armadura["name"],
                "pieces": [
                    {
                        "id": piece["id"],
                        "name": piece["name"],
                        "type": piece["type"],
                        "assets": {
                            "imageMale": piece["assets"].get("imageMale", "No disponible")if piece["assets"] else "No disponible",
                            "imageFemale": piece["assets"].get("imageFemale", "No disponible") if piece["assets"] else "No disponible"
                        }
                    } for piece in armadura["pieces"]
                ]} for armadura in data]
    
    with open("armaduras.json", "w", encoding="utf-8") as file:
        json.dump(armaduras, file, indent=4, ensure_ascii=False)

def inicio():
    count = 0
    URL_List = ["https://mhw-db.com/monsters", "https://mhw-db.com/weapons",
             "https://mhw-db.com/locations","https://mhw-db.com/items", "https://mhw-db.com/armor/sets"]


    for URL in URL_List:
        match count:
            case 0:
                get_monsters(URL)
                count += 1
                print("Monstruos")
            case 1: 
                get_arma(URL)
                count += 1
                print("Armas")
            case 2:
                get_location(URL)
                count += 1
                print("Lugares")
            case 3:
                get_item(URL)
                count += 1
                print("Items")
            case 4:
                get_armadura(URL)
                count += 1
                print("Armaduras")
inicio()
