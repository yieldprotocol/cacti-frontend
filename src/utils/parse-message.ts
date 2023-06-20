type RegExpMatchArrayWithIndices = RegExpMatchArray & { indices: Array<[number, number]> };

export const parseMessage = (str: string) => {
  /** Regex parses any function between <| and |>.
   * 2 capture groups, one being the function name, and the other being all the params.
   * If there are no params, the second group will be empty.
   */
  const regex = new RegExp(/<\|([\w\-]*)\(([^\n]*)\)\|>/g, 'dg');
  const matches = Array.from(str.matchAll(regex)) as RegExpMatchArrayWithIndices[];
  if (!matches.length) return [str];

  const parsedMatches = Array.from(matches).map((match) => {
    // 2 capture groups (see above comment)
    const [_, capture1, capture2] = match;
    // destructure the first element of the indices (tuple of 2 items referring to string start, end)
    const [[start, end]] = match.indices;
    return {
      start,
      end,
      name: capture1,
      params: capture2,
    };
  });
  // TODO: sloppy
  return parsedMatches.reduce((acc, match, i) => {
    const { name, params, start, end } = match;
    if (acc.length === 0 && parsedMatches.length === i + 1)
      return [str.substring(0, start), { name, params }, str.substring(end)];
    if (acc.length === 0) return [str.substring(0, start), { name, params }];
    const lastIndexEnd = parsedMatches[i - 1].end;
    if (parsedMatches.length === i + 1) {
      return [...acc, str.substring(lastIndexEnd, match.start), { name, params }, str.substring(end)];
    }
    return [...acc, str.substring(lastIndexEnd, match.start), { name, params }];
  }, [] as (string | Widget)[]);
};
