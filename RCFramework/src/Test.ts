namespace RC {
	export class Test {
		constructor() {
			let m1 = RC.Numerics.Mat4.FromTRS(new RC.Numerics.Vec3(1, -2, 3),
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(2, 3, 4));
			console.log(m1);

			let m4 = RC.Numerics.Mat3.FromOuterProduct(new RC.Numerics.Vec3(1, -2, 3), new RC.Numerics.Vec3(93, 44, 32));
			let m5 = RC.Numerics.Mat3.FromCross(new RC.Numerics.Vec3(2.5, 3, 4));
			let m6 = RC.Numerics.Mat3.Mul2(m4, m5);
			m6.RotateAround(33, new RC.Numerics.Vec3(2, 3, 4));
			console.log(m6);
		}
	}
}