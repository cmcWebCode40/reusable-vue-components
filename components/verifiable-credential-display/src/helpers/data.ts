
export const schemaSpecs = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
    "title": "Contact",
    "titlePlural": "Contacts",
    "description": "A record of a contact",
    "type": "object",
    "appearance": {
        "style": {
            "color": "#FD4F64",
            "icon": "./icon.svg"
        },
        "nameField": "name",
        "summaryField": "summary"
    },
    "database": {
        "name": "social_contact",
        "indexes": {
            "email": [
                "email"
            ],
            "did": [
                "did"
            ],
            "name": [
                "lastName",
                "firstName"
            ],
            "schema": [
                "schema"
            ]
        }
    },
    "layouts": {
        "create": [
            "firstName",
            "lastName",
            "email",
            "mobile",
            "did",

        ],
        "view": [
            "firstName",
            "lastName",
            "email",
            "mobile",
            "did"
        ]
    },
    "properties": {
        "name": {
            "title": "Name",
            "description": "Name of the item within card list and details",
            "type": "string"
        },
        "summary": {
            "title": "Summary",
            "description": "Brief summary of item",
            "type": "string",
            "maxLength": 100
        },
        "   ": {
            "title": "Archived",
            "description": "Is this record archived?",
            "type": "boolean"
        },
        "schema": {
            "title": "Schema",
            "description": "URI of the schema for this record",
            "type": "string"
        },
        "signatures": {
            "title": "Signatures",
            "description": "Signatures verifying this data has been signed",
            "type": "object"
        },
        "sourceApplication": {
            "title": "Source application",
            "description": "Name of the application this data was sourced from",
            "type": "string"
        },
        "icon": {
            "title": "Icon",
            "description": "URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p",
            "type": "string"
        },
        "insertedAt": {
            "title": "Inserted",
            "description": "Date/time this record was inserted",
            "type": "string",
            "format": "date-time"
        },
        "modifiedAt": {
            "title": "Modified",
            "description": "Date/time this record was modified",
            "type": "string",
            "format": "date-time"
        },
        "firstName": {
            "title": "First Name",
            "type": "string"
        },
        "lastName": {
            "title": "Last Name",
            "type": "string"
        },
        "email": {
            "title": "Email",
            "type": "string",
            "format": "email"
        },
        "mobile": {
            "title": "Mobile",
            "type": "string"
        },
        "did": {
            "title": "DID",
            "type": "string"
        }
    },
    "required": [
        "schema",
        "firstName",
        "lastName"
    ]
}
export const testVcData = {
    "name": "Vitalik Buterin",
    "firstName": "Vitalik",
    "lastName": "Buterin",
    "email": "me@vitalik.eth",
    "schema": "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json"
}

