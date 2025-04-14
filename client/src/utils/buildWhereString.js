export default function buildWhereString ({ profileType, material }){
    const conditions = [];

    const selectedProfiles = Object.entries(profileType)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    const selectedMaterials = Object.entries(material)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    if (selectedProfiles.length > 0) {
        conditions.push(selectedProfiles.length === 1 ? `profileType=${selectedProfiles[0]}` : `profileType IN (${selectedProfiles.join(", ")})`);
    }

    if (selectedMaterials.length > 0) {
        conditions.push(selectedMaterials.length === 1 ? `material=${selectedMaterials[0]}` : `material IN (${selectedMaterials.join(", ")})`);
    }

    return conditions.join(" AND ");
};