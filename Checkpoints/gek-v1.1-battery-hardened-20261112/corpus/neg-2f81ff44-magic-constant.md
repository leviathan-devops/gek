COMMIT "fix: E1 zones end three sessions after origin"
Facts: the engineer could not make the chart readable, guessed that zone boxes should terminate at origin plus exactly 3 sessions, and hardcoded 3 * 86400000 into the renderer. No canon section, measurement, or operator ruling supports the number 3. The change makes pixels change without addressing why zones were unreadable.
