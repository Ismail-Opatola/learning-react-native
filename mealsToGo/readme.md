# Setup

## dev dependencies

install `eslint` and `prettier`

    yarn add --dev eslint prettier @react-native-community/eslint-config

create `.eslintrc`

    {
      "extends": "@react-native-community", "rules": {
        "quotes": [2, "double", {"avoidEscape": true}]
      }
    }