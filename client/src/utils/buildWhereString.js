export default function buildWhereString({ profileType, material, profile, condition }) {
    const conditions = [];

    const selectedProfileTypes = Object.entries(profileType)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    const selectedMaterials = Object.entries(material)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    const selectedProfiles = Object.entries(profile)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    const selectedConditions = Object.entries(condition)
        .filter(([, checked]) => checked)
        .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

    if (selectedProfileTypes.length > 0) {
        conditions.push(selectedProfileTypes.length === 1 ? `profileType=${selectedProfileTypes[0]}` : `profileType IN (${selectedProfileTypes.join(", ")})`);
    }

    if (selectedMaterials.length > 0) {
        conditions.push(selectedMaterials.length === 1 ? `material=${selectedMaterials[0]}` : `material IN (${selectedMaterials.join(", ")})`);
    }

    if (selectedProfiles.length > 0) {
        conditions.push(selectedProfiles.length === 1 ? `profile=${selectedProfiles[0]}` : `profile IN (${selectedProfiles.join(", ")})`);
    }

    if (selectedConditions.length > 0) {
        conditions.push(selectedConditions.length === 1 ? `condition=${selectedConditions[0]}` : `condition IN (${selectedConditions.join(", ")})`);
    }

    // console.log(conditions.join(" AND "));

    return conditions.join(" AND ");
};