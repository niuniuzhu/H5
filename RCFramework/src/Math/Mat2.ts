namespace RC.Numerics {
	export class Mat2 {
		public x: Vec2;
		public y: Vec2;

		public static get identity(): Mat2 {
			return new Mat2(new Vec2(1, 0), new Vec2(0, 1));
		}

		constructor(x: Vec2 = Vec2.zero, y: Vec2 = Vec2.zero) {
			this.x = x;
			this.y = y;
		}

		public static FromCross(xVector: Vec2): Mat2 {
			return new Mat2(xVector, new Vec2(-xVector.y, xVector.x));
		}

		public static Abs(m: Mat2): Mat2 {
			return new Mat2(Vec2.Abs(m.x), Vec2.Abs(m.y));
		}

		public static Transpose(m: Mat2): Mat2 {
			return new Mat2
				(
				new Vec2(m.x.x, m.y.x),
				new Vec2(m.x.y, m.y.y)
				);
		}

		public static Invert(m: Mat2): Mat2 {
			let determinant = 1 / (m.x.x * m.y.y - m.x.y * m.y.x);
			let result = new Mat2();
			result.x.x = m.y.y * determinant;
			result.x.y = -m.x.y * determinant;
			result.y.x = -m.y.x * determinant;
			result.y.y = m.x.x * determinant;
			return result;
		}

		public static Add(p1: Mat2, p2: Mat2): Mat2 {
			let m = new Mat2();
			m.x = Vec2.Add(p1.x, p2.x);
			m.y = Vec2.Add(p1.y, p2.y);
			return m;
		}

		public static AddN(p1: Mat2, p2: number): Mat2 {
			let m = new Mat2();
			m.x = Vec2.AddN(p1.x, p2);
			m.y = Vec2.AddN(p1.y, p2);
			return m;
		}

		public static Sub(p1: Mat2, p2: Mat2): Mat2 {
			let m = new Mat2();
			m.x = Vec2.Sub(p1.x, p2.x);
			m.y = Vec2.Sub(p1.y, p2.y);
			return m;
		}

		public static SubN(p1: Mat2, p2: number): Mat2 {
			let m = new Mat2();
			m.x = Vec2.SubN(p1.x, p2);
			m.y = Vec2.SubN(p1.y, p2);
			return m;
		}

		public static SubN2(p1: number, p2: Mat2): Mat2 {
			let m = new Mat2();
			m.x = Vec2.SubN2(p1, p2.x);
			m.y = Vec2.SubN2(p1, p2.y);
			return m;
		}

		public static Mul(m1: Mat2, m2: Mat2): Mat2 {
			return new Mat2
				(
				new Vec2(m2.x.x * m1.x.x + m2.x.y * m1.y.x, m2.x.x * m1.x.y + m2.x.y * m1.y.y),
				new Vec2(m2.y.x * m1.x.x + m2.y.y * m1.y.x, m2.y.x * m1.x.y + m2.y.y * m1.y.y)
				);
		}

		public static MulN(p1: Mat2, p2: number): Mat2 {
			let m = new Mat2();
			m.x = Vec2.MulN(p1.x, p2);
			m.y = Vec2.MulN(p1.y, p2);
			return m;
		}

		public static Div(p1: Mat2, p2: Mat2): Mat2 {
			let m = new Mat2();
			m.x = Vec2.Div(p1.x, p2.x);
			m.y = Vec2.Div(p1.y, p2.y);
			return m;
		}

		public static DivN(p1: Mat2, p2: number): Mat2 {
			let m = new Mat2();
			m.x = Vec2.DivN(p1.x, p2);
			m.y = Vec2.DivN(p1.y, p2);
			return m;
		}

		public static DivN2(p1: number, p2: Mat2): Mat2 {
			let m = new Mat2();
			m.x = Vec2.DivN2(p1, p2.x);
			m.y = Vec2.DivN2(p1, p2.y);
			return m;
		}

		public static Equals(m1: Mat2, m2: Mat2): boolean {
			if (m1 == null || m2 == null)
				return false;
			return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y);
		}

		public EqualsTo(m: Mat2): boolean {
			return Mat2.Equals(this, m);
		}

		public ToString(): string {
			return "(" + this.x.ToString() + "," + this.y.ToString() + ")";
		}

		public Clone(): Mat2 {
			let m = new Mat2();
			m.x = this.x.Clone();
			m.y = this.y.Clone();
			return m;
		}

		public Identity(): void {
			this.x.x = 1;
			this.x.y = 0;
			this.y.x = 0;
			this.y.y = 1;
		}

		public Transform(v: Vec2): Vec2 {
			return new Vec2
				(
				v.x * this.x.x + v.y * this.y.x,
				v.x * this.x.y + v.y * this.y.y
				);
		}

		public Transpose(): void {
			let m00 = this.x.x;
			let m01 = this.y.x;
			let m10 = this.x.y;
			let m11 = this.y.y;
			this.x.x = m00;
			this.x.y = m01;
			this.y.x = m10;
			this.y.y = m11;
		}

		public Determinant(): number {
			return this.x.x * this.y.y - this.x.y * this.y.x;
		}

		public Invert(): void {
			let determinant = 1 / (this.x.x * this.y.y - this.x.y * this.y.x);
			let m00 = this.y.y * determinant;
			let m01 = -this.x.y * determinant;
			let m10 = -this.y.x * determinant;
			let m11 = this.x.x * determinant;
			this.x.x = m00;
			this.x.y = m01;
			this.y.x = m10;
			this.y.y = m11;
		}
	}
}