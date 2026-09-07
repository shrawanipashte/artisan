# HunarSetu AI Listing API 

## Endpoint 

POST /api/generate-listing 

## Request 
    { 
        "hindiText": "Hindi product description" 
    } 
## Response 
    { 
        "productName": "string", 
        "description": "string", 
        "category": "string", 
        "materials": ["string"], 
        "productionTime": "string", 
        "tags": ["string"] 
    }
## Error 
   { 
        "error": "error message" 
   }