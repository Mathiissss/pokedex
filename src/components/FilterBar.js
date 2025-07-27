import React, { useState, useEffect } from 'react';
import { pokemonApi } from '../services/pokemonApi';

function FilterBar({ selectedType, onTypeChange }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

}

export default FilterBar;