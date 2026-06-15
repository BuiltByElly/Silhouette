const server = Bun.serve({
  port: 4173,
  routes: {
    "/api/v1/users/current/heartbeats.bulk": {
      POST: async (req) => {
        const body: any = await req.json();
        console.log("wakatimes", body);
        return Response.json(
          {
            responses: body.map((hb: unknown) => [hb, 201]),
          },
          { status: 201 },
        );
      },
    },
  },
});
console.log(`Running now at ${server.url}`);
