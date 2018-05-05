namespace RC {
	export class Test {
		constructor() {
			let m1 = RC.Numerics.Mat4.FromTRS(new RC.Numerics.Vec3(1, -2, 3),
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(2, 3, 4));
			let m2 = RC.Numerics.Mat4.FromRotationAxis(-43, RC.Numerics.Vec3.Normalize(new RC.Numerics.Vec3(3, 2, 4)));
			let m3 = RC.Numerics.Mat4.Mul(m1, m2);
			console.log(m3);

			let m4 = RC.Numerics.Mat3.FromOuterProduct(new RC.Numerics.Vec3(1, -2, 3), new RC.Numerics.Vec3(93, 44, 32));
			let m5 = RC.Numerics.Mat3.FromCross(new RC.Numerics.Vec3(2.5, 3, 4));
			let m6 = RC.Numerics.Mat3.Mul(m4, m5);
			console.log(m6);
		}
	}
}