#!/bin/bash

# Check if an argument was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 storeName"
    exit 1
fi

# Convert argument to lowercase
name_lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Create name with first letter uppercase
name_proper=$(echo "${name_lower^}")

# Create the destination directory
mkdir -p "./app/store/${name_proper}"


mkdir -p "./app/core/services/${name_lower}"
# Copy and update the service file with dot naming
cp "./app/core/services/agent/agent.service.ts" "./app/core/services/${name_lower}/${name_lower}.service.ts"
sed -i "s/agent/${name_lower}/g" "./app/core/services/${name_lower}/${name_lower}.service.ts"

sed -i "s/agent/${name_lower}/g" "./app/core/services/${name_proper}/${name_lower}.service.ts"
sed -i "s/Agent/${name_proper}/g" "./app/core/services/${name_proper}/${name_lower}.service.ts"

# Copy and update the selector file with dash naming
cp "./app/store/Agent/agent-selector.ts" "./app/store/${name_proper}/${name_lower}-selector.ts"
sed -i "s/agent/${name_lower}/g" "./app/store/${name_proper}/${name_lower}-selector.ts"
sed -i "s/Agent/${name_proper}/g" "./app/store/${name_proper}/${name_lower}-selector.ts"

cp "./app/store/Agent/agent-selector.ts" "./app/store/${name_proper}/${name_lower}-selector.ts"
sed -i "s/agent/${name_lower}/g" "./app/store/${name_proper}/${name_lower}-selector.ts"
sed -i "s/Agent/${name_proper}/g" "./app/store/${name_proper}/${name_lower}-selector.ts"

# Copy and update the other files with dot naming
for file in action effects reducer; do
    # Copy the file with new dot naming convention
    cp "./app/store/Agent/agent.${file}.ts" "./app/store/${name_proper}/${name_lower}.${file}.ts"
    
    # Replace "agent" with lowercase name and "Agent" with proper case name in the file content
    sed -i "s/agent/${name_lower}/g" "./app/store/${name_proper}/${name_lower}.${file}.ts"
    sed -i "s/Agent/${name_proper}/g" "./app/store/${name_proper}/${name_lower}.${file}.ts"
done


# UPDATE INDEX FILE

# Add import for reducer
echo "" >> "./src/app/store/index.ts"
echo "import { ${name_proper}Reducer, ${name_proper}State } from './${name_proper}/${name_lower}.reducer';" >> "./src/app/store/index.ts"

# Add to RootReducerState interface
sed -i "/export interface RootReducerState {/a \  ${name_proper}List: ${name_proper}State;" "./src/app/store/index.ts"

# UPDATE APP MODULE

# Add import for effects
echo "import { ${name_proper}Effects } from './store/${name_proper}/${name_lower}.effects';" >> "./src/app/app.module.ts"

# Add to EffectsModule.forRoot
sed -i "/EffectsModule\.forRoot\(\[/a \      ${name_proper}Effects," "./src/app/app.module.ts"

# For the model file, create it with custom input
echo "Please enter the model interface for ${name_proper}Model:"
echo "Example format:"
echo "export interface ${name_proper}Model {"
echo "  id: string;"
echo "  name: string;"
echo "  // Add other fields"
echo "}"
echo ""
echo "Enter your model definition (type 'END' on a new line when finished):"

# Create the model file with header and dot naming
echo "export interface ${name_proper}Model {" > "./app/store/${name_proper}/${name_lower}.model.ts"

# Read user input until they type END
while IFS= read -r line; do
    if [ "$line" = "END" ]; then
        break
    fi
    echo "  $line" >> "./app/store/${name_proper}/${name_lower}.model.ts"
done

# Close the interface definition
echo "}" >> "./app/store/${name_proper}/${name_lower}.model.ts"

echo "Created store module '${name_proper}' with all necessary files and updated content."
echo "Files created:"
echo "- ${name_lower}-selector.ts"
echo "- ${name_lower}.action.ts"
echo "- ${name_lower}.effects.ts"
echo "- ${name_lower}.reducer.ts"
echo "- ${name_lower}.model.ts"
echo "Updated:"
echo "- app.module.ts (added effects)"
echo "- store/index.ts (added reducer and state)"



