# Data structure

**Quantity** {

id: uuid

amount: float

units: string (optional)

}

//Ingredients are consumed in the recipe i.e. apple, flour, ground beef

**Ingredient** {

id: uuid

name: string

img: url_string

//optionally reference a step output id

//step_output_uuid:StepOutput (optional)

}

//Materials are not consumed, like a bowl or an oven

**Material** {

id: uuid

name: string

img: url_string

}

**StepIngredient** {

id: uuid

ingredient_uuid:<Ingredient>

quantity: <Quantity>

img: url_string  (optional)  //override the Ingredient image when set

// image should be keyed on ingredient_uuid, quantity, & style

style: string (optional) //how ingredient should be prepared i.e. chopped, sliced, room temperature

notes: string (optional)

}

**StepMaterial** {

id: uuid

material_uuid:<Material>

quantity: <Quantity>

img: url_string (optional)

notes: string (optional)

}

**Recipe** {

id: uuid

ingredients: array<StepIngredient>

materials:array<StepMaterial>

steps: array<Step>

total_length_in_minutes: float

prep_time_in_minutes: float

}





// Record when a recipe has been used.

**RecipeUse** {

id: uuid

recipe_uuid: Recipe

made_at_time: DateTime

comment: string

needs_update: boolean

}

**Step** {

id: uuid

ingredients: array<StepIngredient>

length_in_minutes: float

description: string

warning: string

outputs: array<StepOutput>

}

**StepOutput** {

id: uuid

recipe_uuid:Recipe

step_uuid:Step

name:string (i.e. roux)

}

