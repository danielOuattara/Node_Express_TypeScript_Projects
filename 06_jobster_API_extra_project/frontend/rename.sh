#!/bin/bash

# Recursively find all .js files and iterate over them
find . -type f -name '*.js' | while read -r file; do
  # Extract the filename without the .js extension
  filename="${file%.js}"

  # Rename the file to have a .jsx extension
  mv "$file" "${filename}.jsx"
done