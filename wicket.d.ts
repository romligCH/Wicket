// Types definitions for Wicket 1.3.2
// This DOES NOT include Leaflet, Google Maps and ESRI extensions

/**
 * The Wkt namespace.
 */
declare namespace Wkt {

	/**
	 * Determines whether or not the passed Object is an Array.
	 * @param obj The Object in question
	 */
	export function isArray(obj: any): boolean;

	/**
	 * The default delimiter for separating components of atomic geometry (coordinates)
	 */
	export var delimiter: string;

	/**
	 * An object for reading WKT strings and writing geographic features
	 */
	export class Wkt {
		/**
		 * @param initializer An optional WKT string for immediate read
		 */
		new(initializer ?: string): Wkt;

		/**
		 * Holder for atomic geometry objects (internal representation of geometric components)
		 */
		components: InternalGeometry[];

		/**
		 * The default delimiter for separating components of atomic geometry (coordinates)
		 */
		delimiter: string;

		/**
		 * Some regular expressions copied from OpenLayers.Format.WKT.js
		 */
		regExes: any;

		/**
		 * True to wrap vertices in MULTIPOINT geometries; If true: MULTIPOINT((30 10),(10 30),(40 40)); If false: MULTIPOINT(30 10,10 30,40 40)
		 */
		wrapVerticies: boolean;

		/**
		 * Sets internal geometry (components) from framework geometry (e.g. Google Polygon objects or google.maps.Polygon).
		 * @param obj The framework-dependent geometry representation
		 * @return The object itself
		 */
		fromObject(obj: any): Wkt;

		/**
		 * Returns true if the internal geometry is a collection of geometries.
		 * @return Returns true when it is a collection
		 */
		isCollection(): boolean;

		/**
		 * Reads a WKT string, validating and incorporating it.
		 * @param wkt A WKT string
		 * @return An Array of internal geometry objects
		 */
		read(wkt: string): InternalGeometry[];

		/**
		 * Compares two x,y coordinates for equality.
		 * @param a An object with x and y properties
		 * @param b An object with x and y properties
		 */
		sameCoords(a: Point, b: Point): boolean;

		/**
		 * Creates external geometry objects based on a plug-in framework's construction methods and available geometry classes.
		 * @param config An optional framework-dependent properties specification
		 * @return The framework-dependent geometry representation
		 */
		toObject(config ?: any): any;

		/**
		 * Writes a WKT string.
		 * @param components An Array of internal geometry objects
		 * @return The corresponding WKT representation
		 */
		write(components: InternalGeometry[]): string;

		extract: Extract;

		ingest: Ingest;
	}
	
	/**
	 * An object with x and y properties
	 */
	interface Point{
		x: number;
		y: number;
	}

	type Polygon = Point[];

	/**
	 * Internal representation of geometric components
	 */
	interface InternalGeometry extends Array<Point | Polygon>{}

	/**
	 * This object contains functions as property names that extract WKT strings from the internal representation.
	 */
	interface Extract {
		/**
		 * Return a WKT string representing a chain (linestring) of atoms
		 * @param linestring Multiple x-and-y objects
		 * @return The WKT representation
		 */
		linestring(linestring: Point[]): string;

		/**
		 * Return a WKT string representing multiple chains (multilinestring) of atoms
		 * @param multilinestring Multiple of multiple x-and-y objects
		 * @return The WKT representation
		 */
		multilinestring(multilinestring: Point[][]): string;

		/**
		 * Return a WKT string representing multiple atoms (points)
		 * @param multipoint Multiple x-and-y objects
		 * @return The WKT representation
		 */
		multipoint(multipoint: Point[]): string;

		/**
		 * Return a WKT string representing multiple closed series (multipolygons) of multiple atoms
		 * @param multipolygon Collection of ordered x-and-y objects
		 * @return The WKT representation
		 */
		multipolygon(multipolygon: Polygon[]): string;

		/**
		 * Return a WKT string representing atomic (point) geometry
		 * @param point An object with x and y properties
		 * @return The WKT representation
		 */
		point(point: Point): string;

		/**
		 * Return a WKT string representing multiple atoms in closed series (polygon)
		 * @param multipolygon Collection of ordered x-and-y objects
		 * @return The WKT representation
		 */
		polygon(polygon: Polygon): string;
	}

	/**
	 * This object contains functions as property names that ingest WKT strings into the internal representation.
	 */
	interface Ingest {
		/**
		 * Return an array of features given a geometrycollection WKT fragment.
		 * @param str A WKT fragment representing the geometry collection
		 */
		geometrycollection(str: string): InternalGeometry;

		/**
		 * Return a linestring feature given a linestring WKT fragment.
		 * @param str A WKT fragment representing the linestring
		 */
		linestring(str: string): Point[];

		/**
		 * Return a multilinestring feature given a multilinestring WKT fragment.
		 * @param str A WKT fragment representing the multilinestring
		 */
		multilinestring(str: string): Point[][];

		/**
		 * Return a multipoint feature given a multipoint WKT fragment.
		 * @param str A WKT fragment representing the multipoint
		 */
		multipoint(str: string): Point[];

		/**
		 * Return a multipolygon feature given a multipolygon WKT fragment.
		 * @param str A WKT fragment representing the multipolygon
		 */
		multipolygon(str: string): Polygon[];

		/**
		 * Return point feature given a point WKT fragment.
		 * @param str A WKT fragment representing the point
		 */
		point(str: string): Point;

		/**
		 * Return a polygon feature given a polygon WKT fragment.
		 * @param str A WKT fragment representing the polygon
		 */
		polygon(str: string): Polygon;
	}
}