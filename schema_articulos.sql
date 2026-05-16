-- Creamos un ENUM para los estados del artículo (opcional pero muy recomendado para control)
CREATE TYPE estado_articulo AS ENUM ('borrador', 'publicado', 'archivado');

-- Creamos la tabla principal
CREATE TABLE articulos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  contenido TEXT,
  resumen TEXT,
  
  -- Relación con la tabla nativa de usuarios de Supabase (ideal si los autores inician sesión)
  autor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  estado estado_articulo DEFAULT 'borrador',
  
  -- Multimedia
  imagen_destacada_url TEXT,
  imagen_destacada_alt TEXT,
  
  -- SEO Meta
  meta_titulo TEXT,
  meta_descripcion TEXT,
  
  -- El superpoder de PostgreSQL: JSONB para agrupar todas tus keywords sin romper la normalización
  estrategia_keywords JSONB DEFAULT '{"principales": [], "long_tail": [], "secundarias": []}'::jsonb,
  
  -- Fechas
  fecha_creacion TIMESTAMPTZ DEFAULT now() NOT NULL,
  fecha_actualizacion TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Creamos un índice en el slug para que las búsquedas por URL sean instantáneas
CREATE INDEX idx_articulos_slug ON articulos(slug);

-- 1. Creamos la función que actualiza la fecha
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Se la aplicamos a tu tabla de artículos
CREATE TRIGGER trigger_update_articulos_modtime
BEFORE UPDATE ON articulos
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();

-- ==============================================
-- SEGURIDAD (Row Level Security - RLS)
-- ==============================================

-- Habilitar RLS en la tabla
ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;

-- Política 1: Lectura pública (Cualquiera puede leer artículos)
CREATE POLICY "Permitir lectura publica de articulos"
ON articulos
FOR SELECT
USING (true);

-- Política 2: Inserción solo para usuarios autenticados
CREATE POLICY "Permitir insercion a usuarios autenticados"
ON articulos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Política 3: Actualización solo para el autor del artículo
CREATE POLICY "Permitir actualizacion al autor"
ON articulos
FOR UPDATE
USING (auth.uid() = autor_id);

-- Política 4: Eliminación solo para el autor del artículo
CREATE POLICY "Permitir eliminacion al autor"
ON articulos
FOR DELETE
USING (auth.uid() = autor_id);
