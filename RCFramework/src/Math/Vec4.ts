namespace RC.Numerics {
	export class Vec4 {
		public x: number;
		public y: number;
		public z: number;
		public w: number;

		public static get one(): Vec4 {
			return new Vec4(1, 1, 1, 1);
		}
		public static get minusOne(): Vec4 {
			return new Vec4(-1, -1, -1, -1);
		}
		public static get zero(): Vec4 {
			return new Vec4(0, 0, 0, 0);
		}
		public static get right(): Vec4 {
			return new Vec4(1, 0, 0, 0);
		};
		public static get left(): Vec4 {
			return new Vec4(-1, 0, 0, 0);
		};
		public static get up(): Vec4 {
			return new Vec4(0, 1, 0, 0);
		};
		public static get down(): Vec4 {
			return new Vec4(0, -1, 0, 0);
		};
		public static get forward(): Vec4 {
			return new Vec4(0, 0, 1, 0);
		};
		public static get height(): Vec4 {
			return new Vec4(0, 0, 0, 1);
		};
		public static get low(): Vec4 {
			return new Vec4(0, 0, 0, -1);
		};
		public static get backward(): Vec4 {
			return new Vec4(0, 0, -1, 0);
		};
		public static get positiveInfinityVector(): Vec4 {
			return new Vec4(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		};
		public static get negativeInfinityVector(): Vec4 {
			return new Vec4(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
		};

		constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}

		public static Add(v1: Vec4, v2: Vec4): Vec4 {
			v1 = v1.Clone();
			v1.x += v2.x;
			v1.y += v2.y;
			v1.z += v2.z;
			v1.w += v2.w;
			return v1;
		}

		public static AddN(v: Vec4, n: number): Vec4 {
			v = v.Clone();
			v.x += n;
			v.y += n;
			v.z += n;
			v.w += n;
			return v;
		}

		public static Sub(v1: Vec4, v2: Vec4): Vec4 {
			v1 = v1.Clone();
			v1.x -= v2.x;
			v1.y -= v2.y;
			v1.z -= v2.z;
			v1.w -= v2.w;
			return v1;
		}

		public static SubN(v: Vec4, n: number): Vec4 {
			v = v.Clone();
			v.x -= n;
			v.y -= n;
			v.z -= n;
			v.w -= n;
			return v;
		}

		public static SubN2(n: number, v: Vec4): Vec4 {
			v = v.Clone();
			v.x = n - v.x;
			v.y = n - v.y;
			v.z = n - v.z;
			v.w = n - v.w;
			return v;
		}

		public static Mul(v1: Vec4, v2: Vec4): Vec4 {
			v1 = v1.Clone();
			v1.x *= v2.x;
			v1.y *= v2.y;
			v1.z *= v2.z;
			v1.w *= v2.w;
			return v1;
		}

		public static MulN(v: Vec4, n: number): Vec4 {
			v = v.Clone();
			v.x *= n;
			v.y *= n;
			v.z *= n;
			v.w *= n;
			return v;
		}

		public static Div(v1: Vec4, v2: Vec4): Vec4 {
			v1 = v1.Clone();
			v1.x /= v2.x;
			v1.y /= v2.y;
			v1.z /= v2.z;
			v1.w /= v2.w;
			return v1;
		}

		public static DivN(v: Vec4, n: number): Vec4 {
			v = v.Clone();
			v.x /= n;
			v.y /= n;
			v.z /= n;
			v.w /= n;
			return v;
		}

		public static DivN2(n: number, v: Vec4): Vec4 {
			v = v.Clone();
			v.x = n / v.x;
			v.y = n / v.y;
			v.z = n / v.z;
			v.w = n / v.w;
			return v;
		}

		public static Equals(v1: Vec4, v2: Vec4): boolean {
			return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z && v1.w == v2.w;
		}

		public EqualsTo(v: Vec4): boolean {
			return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
		}

		public ToString(): string {
			return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")";
		}

		public Clone(): Vec4 {
			let v = new Vec4();
			v.x = this.x;
			v.y = this.y;
			v.z = this.z;
			v.w = this.w;
			return v;
		}

		public CopyFrom(v: Vec4): void {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			this.w = v.w;
		}

		public Set(x: number, y: number, z: number, w: number): void {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}

		public ClampMagnitude(maxLength: number): void {
			let sqrMagnitude = this.SqrMagnitude();
			if (sqrMagnitude > (maxLength * maxLength)) {
				let f = maxLength / MathUtils.Sqrt(sqrMagnitude);
				this.x *= f;
				this.y *= f;
				this.z *= f;
				this.w *= f;
			}
		}

		public Magnitude(): number {
			return MathUtils.Sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		}

		public SqrMagnitude(): number {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
		}

		public Distance(vector: Vec4): number {
			return Vec4.Sub(vector, this).Magnitude();
		}

		public DistanceSquared(vector: Vec4): number {
			return Vec4.Sub(vector, this).SqrMagnitude();
		}

		public Negate(): void {
			this.x = -this.x;
			this.y = -this.y;
			this.z = -this.z;
			this.w = -this.w;
		}

		public Scale(scale: Vec4): void {
			this.x *= scale.x;
			this.y *= scale.y;
			this.z *= scale.z;
			this.w *= scale.w;
		}

		public Dot(vector: Vec4): number {
			return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
		}

		public Normalize(): void {
			let f = 1 / this.Magnitude();
			this.x *= f;
			this.y *= f;
			this.z *= f;
			this.w *= f;
		}

		public NormalizeSafe(): void {
			let f = this.Magnitude();
			if (f == 0)
				return;
			this.x *= f;
			this.y *= f;
			this.z *= f;
			this.w *= f;
		}

		public AproxEqualsBox(vector: Vec4, tolerance: number): boolean {
			return (MathUtils.Abs(this.x - vector.x) <= tolerance) &&
				(MathUtils.Abs(this.y - vector.y) <= tolerance) &&
				(MathUtils.Abs(this.z - vector.z) <= tolerance) &&
				(MathUtils.Abs(this.w - vector.w) <= tolerance);
		}

		public ApproxEquals(vector: Vec4, tolerance: number): boolean {
			return this.Distance(vector) <= tolerance;
		}

		public static Distance(v0: Vec4, v1: Vec4): number {
			return Vec4.Sub(v1, v0).Magnitude();
		}

		public static DistanceSquared(v0: Vec4, v1: Vec4): number {
			return Vec4.Sub(v1, v0).SqrMagnitude();
		}

		public static ClampMagnitude(v: Vec4, maxLength: number): Vec4 {
			let nor = v.Clone();
			let sqrMagnitude = nor.SqrMagnitude();
			if (sqrMagnitude > (maxLength * maxLength))
				nor = Vec4.MulN(nor, (maxLength / MathUtils.Sqrt(sqrMagnitude)));
			return nor;
		}

		public static Normalize(v: Vec4): Vec4 {
			return Vec4.MulN(v, (1 / v.Magnitude()));
		}

		public static NormalizeSafe(v: Vec4): Vec4 {
			let f = v.Magnitude();
			if (f == 0)
				return new Vec4();
			return Vec4.MulN(v, (1 / f));
		}

		public static LerpUnclamped(from: Vec4, to: Vec4, t: number): Vec4 {
			return new Vec4(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t, from.w + (to.w - from.w) * t);
		}

		public static Lerp(from: Vec4, to: Vec4, t: number): Vec4 {
			return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec4.LerpUnclamped(from, to, t));
		}

		public static Abs(v: Vec4): Vec4 {
			return new Vec4(MathUtils.Abs(v.x), MathUtils.Abs(v.y), MathUtils.Abs(v.z), MathUtils.Abs(v.w));
		}

		public static Pow(v: Vec4, power: number): Vec4 {
			return new Vec4(MathUtils.Pow(v.x, power), MathUtils.Pow(v.y, power),
				MathUtils.Pow(v.z, power), MathUtils.Pow(v.w, power));
		}

		public static Floor(v: Vec4): Vec4 {
			return new Vec4(MathUtils.Floor(v.x), MathUtils.Floor(v.y), MathUtils.Floor(v.z),
				MathUtils.Floor(v.w));
		}

		public static Round(v: Vec4): Vec4 {
			return new Vec4(MathUtils.Round(v.x), MathUtils.Round(v.y), MathUtils.Round(v.z),
				MathUtils.Round(v.w));
		}
	}
}