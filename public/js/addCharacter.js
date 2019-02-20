$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var characterId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?character_id=") !== -1) {
    characterId = url.split("=")[1];
    getcharacterData(characterId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var charName = $("#charName");
  var charAbilities = $("#charAbilities");
  var charWeapons = $("#charWeapons");
  var charOrigin = $("#charOrigin");
  var charAppearance = $("#charAppearance");
  var charAffiliations = $("#charAffiliations");
  var charStrength = $("#charStrength");
  var charHealth = $("#charHealth");
  var addCharacterForm = $("#addCharacter")
  
  // Giving the postCategorySelect a default value
  // Adding an event listener for when the form is submitted
  $(addCharacterForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!charName.val().trim() || !charAbilities.val().trim() || !charWeapons.val().trim() || !charOrigin.val().trim() || !charAppearance.val().trim() || !charAffiliations.val().trim() || !charStrength.val().trim() || !charHealth.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newCharacter = {
      name: charName.val().trim(),
      abilities: charAbilities.val().trim(),
      weapons: charWeapons.val().trim(),
      origin: charOrigin.val().trim(),
      appearance: charAppearance.val().trim(),
      affiliations: charAffiliations.val().trim(),
      strength: charStrength.val().trim(),
      health: charHealth.val().trim()
    };

    console.log(newCharacter);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newCharacter.id = characterId;
      updateCharacter(newCharacter);
    }
    else {
      submitCharacter(newCharacter);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitCharacter(superHero) {
    $.post("/api/characters/", superHero, function() {
      window.location.href = "/characters";
    });
  }

  // Gets post data for a post if we're editing
  function getCharacterData(id) {
    $.get("/api/characters/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        charName.val(data.name);
        charAbilities.val(data.abilities);
        charWeapons.val(data.weapons);
        charOrigin.val(data.weapons);
        charAppearance.val(data.appearance);
        charAffiliations.val(data.affiliations);
        charStrength.val(data.strength);
        charHealth.val(data.health);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateCharacters(character) {
    $.ajax({
      method: "PUT",
      url: "/api/characters",
      data: post
    })
      .then(function() {
        window.location.href = "/characters";
      });
  }
});
