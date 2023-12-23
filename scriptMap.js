// Mengatur posisi dan tingkat zoom opsional peta
// Map.setCenter(lon, lat, zoom)
Map.setCenter(106.992416, -6.241586, 9);

// Rentang Tanggal
const startDate = '2023-11-01';
const endDate = '2023-11-19';

// Layer Batas Administrasi
const batasKab = ee.FeatureCollection('projects/earthengine-legacy/assets/users/AditRamadhan65/Jabodetabek_SHP');
Map.addLayer(batasKab, {}, 'Batas Kabupaten');
// END Layer Batas Administrasi


// Layer Carbon Monoxide
const carbonMonoxide = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
    .select('CO_column_number_density')
    .filterDate(startDate, endDate);
print(carbonMonoxide);

const averageCarbonMonoxide = carbonMonoxide
    .reduce(ee.Reducer.mean());

const carbonMonoxideViz = {
  min: 0,
  max: 0.05,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(averageCarbonMonoxide.clip(batasKab),
    carbonMonoxideViz, 'Carbon Monoxide (CO)', false);
// END Layer Carbon Monoxide


// Layer Nitrogen Dioxide
const nitrogenDioxide = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .select('tropospheric_NO2_column_number_density')
    .filterDate(startDate, endDate);

const nitrogenDioxideAverage = nitrogenDioxide
    .reduce(ee.Reducer.mean());

const nitrogenDioxideViz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(nitrogenDioxideAverage.clip(batasKab),
    nitrogenDioxideViz, 'Nitrogen Dioxide (NO2)', false);
// END Layer Nitrogen Dioxide


// Layer Formaldehyde
const formaldehyde = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO')
    .select('tropospheric_HCHO_column_number_density')
    .filterDate(startDate, endDate);

const formaldehydeAverage = formaldehyde.reduce(ee.Reducer.mean());

const formaldehydeViz = {
  min: 0.0,
  max: 0.0003,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(formaldehydeAverage.clip(batasKab),
    formaldehydeViz, 'Formaldehyde (HCHO)', false);
// END Layer Formaldehyde


// Layer Sulfur Dioxide (SO2)
const sulfurDioxide = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
    .select('SO2_column_number_density')
    .filterDate(startDate, endDate);

const sulfurDioxideViz = {
  min: 0.0,
  max: 0.0005,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(sulfurDioxide.mean().clip(batasKab),
    sulfurDioxideViz, 'Sulfur Dioxide (SO2)', false);
// END Layer Sulfur Dioxide (SO2)

// Layer Methane (CH4)
const methane = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
    .select('CH4_column_volume_mixing_ratio_dry_air')
    .filterDate(startDate, endDate);

const methaneViz = {
  min: 1750,
  max: 1900,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(methane.mean().clip(batasKab),
    methaneViz, 'Methane (CH4)', false);

// END Layer Methane (CH4)


// Layer Ozone (O3)
const ozone = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
    .select('O3_column_number_density')
    .filterDate(startDate, endDate);

const ozoneViz = {
  min: 0,
  max: 0.15,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(ozone.mean().clip(batasKab),
    ozoneViz, 'Ozone (O3)', false);
// END Layer Ozone (O3)


// Layer Aerosol Index
const aerosolIndex = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI')
    .select('absorbing_aerosol_index')
    .filterDate(startDate, endDate);

const aerosolIndexViz = {
  min: -1,
  max: 2.0,
  palette: ['black', 'blue', 'purple',
    'cyan', 'green', 'yellow', 'red'],
};

Map.addLayer(aerosolIndex.mean().clip(batasKab), aerosolIndexViz, 'Aerosol Index', false);
// END Layer Aerosol Index
