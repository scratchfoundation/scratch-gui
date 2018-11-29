/* global Opal */

// HACK: monkey patch to get Parser::SyntaxError exception
const patch = Opal.String.$new(`
module Parser
  module Source
    class Buffer
      def source_lines
        @lines ||= begin
          lines = @source.lines.to_a
          lines << ''.dup if @source.end_with?("\n".freeze)

          lines = lines.map do |line|
            line = line.chomp("\n".freeze)
            line.freeze
            line
          end

          lines.freeze
        end
      end
    end
  end
end

module Parser
  class Diagnostic
    def render_line(range, ellipsis=false, range_end=false)
      source_line    = range.source_line
      highlight_line = ' ' * source_line.length

      @highlights.each do |highlight|
       line_range = range.source_buffer.line_range(range.line)
        if highlight = highlight.intersect(line_range)
          highlight_line[highlight.column_range] = '~' * highlight.size
        end
      end

      if range.is?("\n")
        highlight_line += "^"
      else
        if !range_end && range.size >= 1
          s = '^' + '~' * (range.size - 1)
        else
          s = '~' * range.size
        end
        end_pos = range.column_range.end
        if !range.column_range.exclude_end?
          end_pos += 1
        end
        highlight_line = highlight_line[0...range.column_range.begin] + s + highlight_line[end_pos..-1]
      end

      highlight_line += '...' if ellipsis

      [source_line, highlight_line].
        map { |line| "#{range.source_buffer.name}:#{range.line}: #{line}" }
    end
  end
end
`);
eval(Opal.Opal.$compile(patch)); // eslint-disable-line no-eval

export default Opal.Parser.CurrentRuby;
