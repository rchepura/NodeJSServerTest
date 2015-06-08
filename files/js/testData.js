App.Pet.getPetById({petId: 222});
App.Pet.findPetsByTags({tags: 'tag1,tag2'});
App.Pet.findPetsByStatus({status: 'available,pending'});
App.Pet.deletePet({petId: 234, api_key: 'fdgsdf5253'});
App.Pet.updatePetWithForm({"petId" : "WJKEJ343","name" : 'pat_name', "status" : "pending"});

App.Pet.addPet({"body": {
    "category": {
        "id": 1212,
        "name": "#/definitions/Category"
    },
    "name": "doggie",
    "photoUrls": ["url/1", "url/2"],
    "tags": [{
        "id": 565,
        "name": "#/definitions/Tag"
    }],
    "status": 1
}});
App.Pet.updatePet({"body": {
        "petId" : "WJKEJ343",
        "category": {
            "id": 1212,
            "name": "#/definitions/Category"
        },
        "name": "doggie",
        "photoUrls": ["url/1", "url/2"],
        "tags": [{
            "id": 565,
            "name": "#/definitions/Tag"
        }],
        "status": 1
}});
